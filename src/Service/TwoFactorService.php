<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class TwoFactorService
{
    public function __construct(private MailerInterface $mailer, private EntityManagerInterface $entityManager)
    {
    }

    public function send2FACode(User $user): void
    {
        $code = random_int(100000, 999999);
        $expiration = new \DateTime('+5 minutes');
        $canRegenerateUntil = new \DateTime('+10 minutes');

        $user->setEmailAuthCode($code);
        $user->setEmailAuthCodeExpiresAt($expiration);
        $user->setEmailAuthCanRegenerateUntil($canRegenerateUntil);
        $user->setAttempts(0);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $email = (new Email())
            ->from('contact@raphael-durand.fr')
            ->to($user->getEmail())
            ->subject('Votre code de connexion')
            ->text("Votre code de vérification est : $code. (Ce code est valable 5 minutes)");

        $email
            ->getHeaders()
            ->addTextHeader('X-Auto-Response-Suppress', 'OOF, DR, RN, NRN, AutoReply');

        $this->mailer->send($email);
    }
}
