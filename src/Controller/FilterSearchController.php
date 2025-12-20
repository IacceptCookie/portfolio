<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

final class FilterSearchController extends AbstractController
{
    public function __construct(
        private CategoryRepository $categoryRepo,
        private TagRepository $tagRepo,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $search = $request->query->get('search', '');

        $tags = $this->tagRepo->search($search, true);
        $categories = $this->categoryRepo->search($search, true);

        $results = [];

        foreach ($tags as $tagData) {
            $tag = is_array($tagData) ? $tagData[0] : $tagData;
            $usageCount = is_array($tagData) && isset($tagData['articleCount']) ? (int) $tagData['articleCount'] : 0;

            $results[] = [
                'type' => 'tag',
                'id' => $tag->getId(),
                'label' => $tag->getTagLabel(),
                'color' => $tag->getTagColor(),
                'useCount' => $usageCount,
            ];
        }

        foreach ($categories as $catData) {
            $category = is_array($catData) ? $catData[0] : $catData;
            $usageCount = is_array($catData) && isset($catData['articleCount']) ? (int) $catData['articleCount'] : 0;

            $results[] = [
                'type' => 'category',
                'id' => $category->getId(),
                'label' => $category->getCategoryLabel(),
                'useCount' => $usageCount,
            ];
        }

        usort($results, fn ($a, $b) => strcmp($a['label'], $b['label']));

        $limit = 6;
        $page = max(1, (int) $request->query->get('page', 1));
        $total = count($results);
        $offset = ($page - 1) * $limit;

        $paginatedResults = array_slice($results, $offset, $limit);

        $response = [
            'current_page' => $page,
            'total_pages' => (int) ceil($total / $limit),
            'total_items' => $total,
            'items_per_page' => $limit,
            'items' => $paginatedResults,
        ];

        return new JsonResponse($response, Response::HTTP_OK);
    }
}
