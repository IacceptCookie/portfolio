<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CsrfListener
{
    private CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        $currentRoute = $request->attributes->get('_route');

        if (str_starts_with($currentRoute, 'authentication')) {
            return;
        }

        if (in_array($request->getMethod(), ['POST', 'PUT', 'DELETE'], true)) {
            $csrfToken = $request->headers->get('X-CSRF-TOKEN');

            if (!$csrfToken) {
                throw new BadRequestHttpException('CSRF token missing');
            }

            if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('api-csrf-token', $csrfToken))) {
                throw new BadRequestHttpException('Invalid CSRF token');
            }
        }
    }
}
