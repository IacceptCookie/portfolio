<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use App\Repository\UserRepository;
use App\State\MeProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(),
        new Get(
            uriTemplate: '/me',
            openapiContext: [
                'summary' => 'Retrieves the connected user',
                'description' => 'Retrieves the connected user',
                'responses' => [
                    '200' => [
                        'description' => 'connected user resource',
                        'content' => [
                            'application/ld+json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/User.jsonld-User_read_User_me',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            normalizationContext: ['groups' => ['User_me']],
            security: "is_granted('ROLE_USER') and object == user",
            provider: MeProvider::class,
        ),
        new Patch(
            normalizationContext: ['groups' => ['User_read', 'User_me']],
            denormalizationContext: ['groups' => ['User_write']],
            security: "is_granted('ROLE_USER') and object == user",
        ),
    ],
    normalizationContext: ['groups' => ['User_read']],
)]
#[UniqueEntity('login')]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['User_read', 'User_me'])]
    private ?int $id = null;

    #[ORM\Column(length: 50, unique: true)]
    #[Groups(['User_read', 'User_write', 'User_me'])]
    #[Assert\Regex('/[^&"<>]/')]
    #[ApiProperty(
        example: 'johndoe54'
    )]
    private ?string $login = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var ?string The hashed password
     */
    #[ORM\Column]
    #[Groups(['User_write'])]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    #[Groups(['User_read', 'User_write', 'User_me'])]
    #[Assert\Regex('/[^&"<>]/')]
    #[ApiProperty(
        example: 'John'
    )]
    private ?string $firstname = null;

    #[ORM\Column(length: 50)]
    #[Groups(['User_read', 'User_write', 'User_me'])]
    #[Assert\Regex('/[^&"<>]/')]
    #[ApiProperty(
        example: 'Doe'
    )]
    private ?string $lastname = null;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Article::class, orphanRemoval: true)]
    private Collection $articles;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['User_write', 'User_me'])]
    #[Assert\Email(message: "L'email '{{ value }}' n'est pas valide.")]
    private ?string $email = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): static
    {
        $this->login = $login;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->login;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_READER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

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
            $article->setAuthor($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getAuthor() === $this) {
                $article->setAuthor(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }
}
