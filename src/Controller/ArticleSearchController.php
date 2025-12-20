<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

final class ArticleSearchController extends AbstractController
{
    public function __construct(
        private ArticleRepository $articleRepository,
        private SerializerInterface $serializer,
    ) {
    }

    public function __invoke(Request $request, bool $isPublic, int $limit): JsonResponse
    {
        $search = $request->query->get('search', '');
        $tagIds = $request->query->all('tags');
        $categoryIds = $request->query->all('categories');

        $page = max(1, (int) $request->query->get('page', 1));
        $offset = ($page - 1) * $limit;

        [$articles, $total] = $this->articleRepository->search($search, $isPublic, $tagIds, $categoryIds, $limit, $offset);

        $data = $this->serializer->normalize(
            $articles,
            null,
            [AbstractNormalizer::GROUPS => ['Article_read']]
        );

        $response = [
            'current_page' => $page,
            'total_pages' => (int) ceil($total / $limit),
            'total_items' => $total,
            'items_per_page' => $limit,
            'items' => $data,
        ];

        return new JsonResponse($response, Response::HTTP_OK);
    }
}
