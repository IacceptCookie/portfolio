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

        $tags = $this->tagRepo->search($search);
        $categories = $this->categoryRepo->search($search);

        $results = [];

        foreach ($tags as $tag) {
            $results[] = [
                'type' => 'tag',
                'id' => $tag->getId(),
                'label' => $tag->getTagLabel(),
                'color' => $tag->getTagColor(),
            ];
        }

        foreach ($categories as $category) {
            $results[] = [
                'type' => 'category',
                'id' => $category->getId(),
                'label' => $category->getCategoryLabel(),
            ];
        }

        usort($results, fn ($a, $b) => strcmp($a['label'], $b['label']));

        return new JsonResponse($results, Response::HTTP_OK);
    }
}
