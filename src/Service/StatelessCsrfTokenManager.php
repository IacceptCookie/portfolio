<?php

namespace App\Service;

use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class StatelessCsrfTokenManager implements CsrfTokenManagerInterface
{
    private string $secret;

    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }

    public function getToken(string $tokenId): CsrfToken
    {
        $timestamp = time();
        $hash = hash_hmac('sha256', $tokenId.':'.$timestamp, $this->secret);
        $tokenValue = base64_encode($hash.':'.$timestamp);

        return new CsrfToken($tokenId, $tokenValue);
    }

    public function refreshToken(string $tokenId): CsrfToken
    {
        return $this->getToken($tokenId);
    }

    public function removeToken(string $tokenId): ?string
    {
        // Stateless: nothing to remove
        return null;
    }

    public function isTokenValid(CsrfToken $token): bool
    {
        $decoded = base64_decode($token->getValue(), true);
        if (!$decoded) {
            return false;
        }

        // Split hash and timestamp
        $parts = explode(':', $decoded);
        if (2 !== count($parts)) {
            return false;
        }

        [$hash, $timestamp] = $parts;

        // Recompute HMAC and compare
        $expectedHash = hash_hmac('sha256', $token->getId().':'.$timestamp, $this->secret);

        return hash_equals($expectedHash, $hash);
    }
}
