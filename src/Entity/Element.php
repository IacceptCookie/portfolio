<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Tests\Fixtures\Metadata\Get;
use App\Repository\ElementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => [
        'Element_read',
        'Element_write',
    ],
    ],
)]
#[ORM\Entity(repositoryClass: ElementRepository::class)]
class Element
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Element_read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['Element_read', 'Element_write'])]
    private ?string $elementText = null;

    #[ORM\Column(length: 50)]
    #[Groups(['Element_read', 'Element_write'])]
    private ?string $elementComponentName = null;

    #[ORM\Column]
    #[Groups(['Element_read', 'Element_write'])]
    private ?int $elementNumber = null;

    #[ORM\ManyToOne(inversedBy: 'elements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Article $article = null;

    #[ORM\ManyToOne(inversedBy: 'elements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Image $image = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getElementText(): ?string
    {
        return $this->elementText;
    }

    public function setElementText(string $elementText): static
    {
        $this->elementText = $elementText;

        return $this;
    }

    public function getElementComponentName(): ?string
    {
        return $this->elementComponentName;
    }

    public function setElementComponentName(string $elementComponentName): static
    {
        $this->elementComponentName = $elementComponentName;

        return $this;
    }

    public function getElementNumber(): ?int
    {
        return $this->elementNumber;
    }

    public function setElementNumber(int $elementNumber): static
    {
        $this->elementNumber = $elementNumber;

        return $this;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): static
    {
        $this->article = $article;

        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): static
    {
        $this->image = $image;

        return $this;
    }
}
