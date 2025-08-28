<?php

namespace App\Controller;

use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

final class TagSearchController extends AbstractController
{
    public function __construct(
        private TagRepository $tagRepository,
        private SerializerInterface $serializer,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $search = $request->query->get('search', '');

        $tags = $this->tagRepository->search($search);

        $data = $this->serializer->normalize(
            $tags,
            null,
            [AbstractNormalizer::GROUPS => ['Tag_read']]
        );

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
