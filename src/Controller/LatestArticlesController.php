<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

final class LatestArticlesController extends AbstractController
{
    public function __construct(
        private ArticleRepository $articleRepository,
        private SerializerInterface $serializer,
    ) {
    }

    public function __invoke(): JsonResponse
    {
        $articles = $this->articleRepository->findLatestPublic(3);

        $data = $this->serializer->normalize(
            $articles,
            null,
            [AbstractNormalizer::GROUPS => ['Article_read']]
        );

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
