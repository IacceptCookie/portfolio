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

    public function __invoke(Request $request): JsonResponse
    {
        $search = $request->query->get('search', '');
        $isPublic = $request->query->get('isPublic', '');
        $tagIds = $request->query->all('tags');
        $categoryIds = $request->query->all('categories');

        $articles = $this->articleRepository->search($search, $isPublic, $tagIds, $categoryIds);

        $data = $this->serializer->normalize(
            $articles,
            null,
            [AbstractNormalizer::GROUPS => ['Article_read']]
        );

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
