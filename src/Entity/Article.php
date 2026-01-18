<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\ArticleSearchController;
use App\Controller\FeaturedArticlesController;
use App\Controller\LatestArticlesController;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/articles/search',
            defaults: [
                'isPublic' => true,
                'limit' => 2,
            ],
            controller: ArticleSearchController::class,
            openapiContext: [
                'parameters' => [
                    [
                        'name' => 'search',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'string'],
                        'description' => 'Mot-clé pour rechercher dans le titre ou la description',
                    ],
                    [
                        'name' => 'tags[]',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'array', 'items' => ['type' => 'integer']],
                        'style' => 'form',
                        'explode' => true,
                        'description' => 'Liste d\'IDs de tags à filtrer',
                    ],
                    [
                        'name' => 'categories[]',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'array', 'items' => ['type' => 'integer']],
                        'style' => 'form',
                        'explode' => true,
                        'description' => 'Liste d\'IDs de catégories à filtrer',
                    ],
                    [
                        'name' => 'page',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'integer'],
                        'description' => 'Page d\'article à récupérer',
                    ],
                ],
            ],
            normalizationContext: ['groups' => ['Article_read']],
            name: 'search_articles'
        ),
        new GetCollection(
            uriTemplate: '/articles/editor/search',
            defaults: [
                'isPublic' => true,
                'limit' => 6,
            ],
            controller: ArticleSearchController::class,
            openapiContext: [
                'parameters' => [
                    [
                        'name' => 'search',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'string'],
                        'description' => 'Mot-clé pour rechercher dans le titre ou la description',
                    ],
                    [
                        'name' => 'tags[]',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'array', 'items' => ['type' => 'integer']],
                        'style' => 'form',
                        'explode' => true,
                        'description' => 'Liste d\'IDs de tags à filtrer',
                    ],
                    [
                        'name' => 'categories[]',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'array', 'items' => ['type' => 'integer']],
                        'style' => 'form',
                        'explode' => true,
                        'description' => 'Liste d\'IDs de catégories à filtrer',
                    ],
                    [
                        'name' => 'page',
                        'in' => 'query',
                        'required' => false,
                        'schema' => ['type' => 'integer'],
                        'description' => 'Page d\'article à récupérer',
                    ],
                ],
            ],
            normalizationContext: ['groups' => ['Article_read']],
            name: 'search_articles_editor'
        ),
        new GetCollection(
            uriTemplate: '/articles/latest',
            controller: LatestArticlesController::class,
            openapiContext: [
                'summary' => 'Récupère les 3 derniers articles publics',
            ],
            normalizationContext: ['groups' => ['Article_read']],
            name: 'latest_articles'
        ),
        new GetCollection(
            uriTemplate: '/articles/featured',
            controller: FeaturedArticlesController::class,
            openapiContext: [
                'summary' => 'Récupère les articles mis en avant (configurés dans featured_articles.json)',
            ],
            normalizationContext: ['groups' => ['Article_read']],
            name: 'featured_articles'
        ),
        new Get(
            uriTemplate: '/articles/{slug}',
            uriVariables: [
                'slug' => new Link(fromClass: Article::class, identifiers: ['slug']),
            ],
            normalizationContext: ['groups' => ['Article_read', 'Article_read_alone']],
        ),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => [
        'Article_read',
    ],
    ],
    denormalizationContext: ['groups' => [
        'Article_write',
    ],
    ],
    order: ['articleTitle' => 'ASC'],
)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Article_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100, unique: true)]
    #[ApiProperty(readable: true, writable: false)]
    #[Groups(['Article_read'])]
    private ?string $slug = null;

    #[ORM\Column(length: 80)]
    #[Groups(['Article_read', 'Article_write'])]
    private ?string $articleTitle = null;

    #[ORM\Column(length: 400)]
    #[Groups(['Article_read', 'Article_write'])]
    private ?string $articleDescription = null;

    #[ORM\Column]
    #[Groups(['Article_read', 'Article_write'])]
    private ?int $readingTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['Article_read'])]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiProperty(readable: true, writable: false)]
    private ?User $author = null;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'articles')]
    #[Groups(['Article_read_alone', 'Article_write'])]
    private Collection $categories;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'articles')]
    #[Groups(['Article_read', 'Article_write'])]
    private Collection $tags;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Element::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['Article_read_alone', 'Article_write'])]
    private Collection $elements;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Article_read', 'Article_write'])]
    private ?Image $illustration = null;

    #[ORM\Column]
    #[Groups(['Article_read', 'Article_write'])]
    private ?bool $isPublic = null;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->elements = new ArrayCollection();
    }

    #[ORM\PrePersist]
    public function setSlugOnCreate(): void
    {
        $this->updateSlug();
    }

    #[ORM\PreUpdate]
    public function setSlugOnUpdate(PreUpdateEventArgs $event): void
    {
        if ($event->hasChangedField('articleTitle')) {
            $this->updateSlug();
        }
    }

    private function updateSlug(): void
    {
        if ($this->articleTitle) {
            $slugger = new AsciiSlugger();
            $this->slug = strtolower($slugger->slug($this->articleTitle)->toString());
        }
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticleDescription(): ?string
    {
        return $this->articleDescription;
    }

    public function setArticleDescription(string $articleDescription): static
    {
        $this->articleDescription = $articleDescription;

        return $this;
    }

    public function getReadingTime(): ?int
    {
        return $this->readingTime;
    }

    public function setReadingTime(int $readingTime): static
    {
        $this->readingTime = $readingTime;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    /**
     * @return Collection<int, Element>
     */
    public function getElements(): Collection
    {
        return $this->elements;
    }

    public function addElement(Element $element): static
    {
        if (!$this->elements->contains($element)) {
            $this->elements->add($element);
            $element->setArticle($this);
        }

        return $this;
    }

    public function removeElement(Element $element): static
    {
        if ($this->elements->removeElement($element)) {
            // set the owning side to null (unless already changed)
            if ($element->getArticle() === $this) {
                $element->setArticle(null);
            }
        }

        return $this;
    }

    public function getIllustration(): ?Image
    {
        return $this->illustration;
    }

    public function setIllustration(?Image $illustration): static
    {
        $this->illustration = $illustration;

        return $this;
    }

    public function getArticleTitle(): ?string
    {
        return $this->articleTitle;
    }

    public function setArticleTitle(string $articleTitle): static
    {
        $this->articleTitle = $articleTitle;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    #[ORM\PrePersist]
    public function setCreatedDateValue(): void
    {
        if (!$this->creationDate) {
            $this->creationDate = new \DateTime();
        }
    }

    public function setCreationDate(\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getIsPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): static
    {
        $this->isPublic = $isPublic;

        return $this;
    }
}
