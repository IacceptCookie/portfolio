<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\FilterSearchController;
use App\Controller\TagSearchController;
use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/tags/search',
            controller: TagSearchController::class,
            openapiContext: [
                'parameters' => [
                    [
                        'name' => 'search',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'string'],
                        'description' => 'Mot-clé pour rechercher des tags par nom',
                    ],
                ],
            ],
            normalizationContext: ['groups' => ['Tag_read']],
            name: 'search_tags'
        ),
        new GetCollection(
            uriTemplate: '/search/filter',
            controller: FilterSearchController::class,
            openapiContext: [
                'summary' => 'Recherche mixte tags + catégories',
                'parameters' => [
                    [
                        'name' => 'search',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'string'],
                        'description' => 'Recherche par label de tag ou de catégorie',
                    ],
                    [
                        'name' => 'page',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'integer'],
                    ],
                    [
                        'name' => 'itemsPerPage',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'integer'],
                    ],
                ],
            ],
            output: false,
            read: false,
        ),
        new Get(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => [
        'Tag_read',
    ],
    ],
    denormalizationContext: ['groups' => [
        'Tag_write',
    ],
    ],
    order: ['tagLabel' => 'ASC'],
)]
#[ORM\Entity(repositoryClass: TagRepository::class)]
class Tag
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Article_read', 'Tag_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['Article_read', 'Tag_read', 'Tag_write'])]
    private ?string $tagLabel = null;

    #[ORM\Column(length: 6)]
    #[Groups(['Article_read', 'Tag_read', 'Tag_write'])]
    private ?string $tagColor = null;

    #[ORM\ManyToMany(targetEntity: Article::class, mappedBy: 'tags')]
    private Collection $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTagLabel(): ?string
    {
        return $this->tagLabel;
    }

    public function setTagLabel(string $tagLabel): static
    {
        $this->tagLabel = $tagLabel;

        return $this;
    }

    public function getTagColor(): ?string
    {
        return $this->tagColor;
    }

    public function setTagColor(string $tagColor): static
    {
        $this->tagColor = $tagColor;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->addTag($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            $article->removeTag($this);
        }

        return $this;
    }
}
