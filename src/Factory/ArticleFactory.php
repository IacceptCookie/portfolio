<?php

namespace App\Factory;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;
use Zenstruck\Foundry\Persistence\Proxy;
use Zenstruck\Foundry\Persistence\ProxyRepositoryDecorator;

/**
 * @extends PersistentProxyObjectFactory<Article>
 *
 * @method        Article|Proxy                              create(array|callable $attributes = [])
 * @method static Article|Proxy                              createOne(array $attributes = [])
 * @method static Article|Proxy                              find(object|array|mixed $criteria)
 * @method static Article|Proxy                              findOrCreate(array $attributes)
 * @method static Article|Proxy                              first(string $sortedField = 'id')
 * @method static Article|Proxy                              last(string $sortedField = 'id')
 * @method static Article|Proxy                              random(array $attributes = [])
 * @method static Article|Proxy                              randomOrCreate(array $attributes = [])
 * @method static ArticleRepository|ProxyRepositoryDecorator repository()
 * @method static Article[]|Proxy[]                          all()
 * @method static Article[]|Proxy[]                          createMany(int $number, array|callable $attributes = [])
 * @method static Article[]|Proxy[]                          createSequence(iterable|callable $sequence)
 * @method static Article[]|Proxy[]                          findBy(array $attributes)
 * @method static Article[]|Proxy[]                          randomRange(int $min, int $max, array $attributes = [])
 * @method static Article[]|Proxy[]                          randomSet(int $number, array $attributes = [])
 */
final class ArticleFactory extends PersistentProxyObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Article::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'articleDescription' => self::faker()->text(400),
            'author' => UserFactory::new(),
            'illustration' => ImageFactory::new(),
            'readingTime' => self::faker()->randomNumber(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Article $article): void {})
        ;
    }
}
