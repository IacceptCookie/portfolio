<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\TwoFactorService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class AuthController extends AbstractController
{
    #[Route('/authentication/token', name: 'authentication_token', methods: ['POST'])]
    public function authenticate(#[CurrentUser] ?User $user, TwoFactorService $service, Request $request): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $service->send2FACode($user);
        $session = $request->getSession();
        $session->set('user_id', $user->getId());

        return $this->json([
            'message' => 'Check your email for 2FA',
        ], Response::HTTP_OK);
    }

    #[Route('/authentication/2fa/regenerate', name: 'authentication_2fa_regenerate', methods: ['GET'])]
    public function regenerate2FA(
        Request $request,
        UserRepository $repository,
        EntityManagerInterface $entityManager,
        TwoFactorService $service,
    ): JsonResponse {
        $userId = $request->getSession()->get('user_id');
        if (null === $userId) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $user = $repository->findById($userId);

        if (null === $user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        if (!$user->getEmailAuthCode() || $user->getEmailAuthCanRegenerateUntil() < new \DateTime()) {
            $user->setEmailAuthCode(null);
            $user->setAttempts(null);
            $user->setEmailAuthCodeExpiresAt(null);
            $user->setEmailAuthCanRegenerateUntil(null);
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['message' => '2FA session expired, you need to authenticate again'], Response::HTTP_BAD_REQUEST);
        }

        $service->send2FACode($user);

        return $this->json([
            'message' => 'Check your email for 2FA',
        ], Response::HTTP_OK);
    }

    #[Route('/authentication/2fa', name: 'authentication_2fa', methods: ['POST'])]
    public function verify2FA(
        Request $request,
        UserRepository $repository,
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $jwtManager,
        CsrfTokenManagerInterface $csrfTokenManager,
    ): JsonResponse {
        $userId = $request->getSession()->get('user_id');
        if (null === $userId) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $user = $repository->findById($userId);
        $data = json_decode($request->getContent(), true);

        if (null === $user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        if (!$user->getEmailAuthCode() || $user->getEmailAuthCodeExpiresAt() < new \DateTime()) {
            $user->setEmailAuthCode(null);
            $user->setAttempts(null);
            $user->setEmailAuthCodeExpiresAt(null);
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['message' => 'Expired code, please try to regenerate one'], Response::HTTP_BAD_REQUEST);
        }

        if ($user->getAttempts() >= 5) {
            $user->setEmailAuthCode(null);
            $user->setAttempts(null);
            $user->setEmailAuthCodeExpiresAt(null);
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['message' => 'Expired code, please try to regenerate one'], Response::HTTP_BAD_REQUEST);
        }

        if ($user->getEmailAuthCode() !== $data['code']) {
            $user->setAttempts($user->getAttempts() + 1);
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['message' => 'Invalid code'], Response::HTTP_BAD_REQUEST);
        }

        $user->setEmailAuthCode(null);
        $user->setAttempts(null);
        $user->setEmailAuthCodeExpiresAt(null);
        $user->setEmailAuthCanRegenerateUntil(null);
        $entityManager->persist($user);
        $entityManager->flush();

        $jwtToken = $jwtManager->create($user);
        $csrfToken = $csrfTokenManager->getToken('api-csrf-token');

        $cookie = new Cookie(
            'BEARER',
            $jwtToken,
            time() + 1800,
            '/',
            null,
            false,
            true,
            false,
        );
        $response = $this->json([
            'user' => $user->getUserIdentifier(),
            'csrf_token' => $csrfToken,
            'roles' => $user->getRoles(),
        ], Response::HTTP_OK);

        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route('/authentication/logout', name: 'authentication_logout', methods: ['POST'])]
    public function logout(): Response
    {
        $response = new Response('Logout');

        $response->headers->clearCookie(
            'BEARER',
            '/',
            null,
            false,
            true,
            false
        );

        return $response;
    }
}
