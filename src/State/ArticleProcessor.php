<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Article;
use Symfony\Bundle\SecurityBundle\Security;

class ArticleProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $decorated,
        private Security $security,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof Article && null === $data->getAuthor()) {
            $data->setAuthor($this->security->getUser());
        }

        return $this->decorated->process($data, $operation, $uriVariables, $context);
    }
}
