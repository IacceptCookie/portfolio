<?php

namespace App\Entity;

use App\Repository\ElementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ElementRepository::class)]
class Element
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $elementText = null;

    #[ORM\Column(length: 50)]
    private ?string $elementComponentName = null;

    #[ORM\Column]
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
