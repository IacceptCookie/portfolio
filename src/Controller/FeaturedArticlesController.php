<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

final class FeaturedArticlesController extends AbstractController
{
    public function __construct(
        private ArticleRepository $articleRepository,
        private SerializerInterface $serializer,
        private string $projectDir,
    ) {
    }

    public function __invoke(): JsonResponse
    {
        $configPath = $this->projectDir.'/config/featured_articles.json';

        if (!file_exists($configPath)) {
            return new JsonResponse([], Response::HTTP_OK);
        }

        $config = json_decode(file_get_contents($configPath), true);
        $slugs = $config['featured_slugs'] ?? [];

        $articles = $this->articleRepository->findBySlugs($slugs);

        // Trier les articles dans l'ordre des slugs configurés
        $orderedArticles = [];
        foreach ($slugs as $slug) {
            foreach ($articles as $article) {
                if ($article->getSlug() === $slug) {
                    $orderedArticles[] = $article;
                    break;
                }
            }
        }

        $data = $this->serializer->normalize(
            $orderedArticles,
            null,
            [AbstractNormalizer::GROUPS => ['Article_read']]
        );

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
