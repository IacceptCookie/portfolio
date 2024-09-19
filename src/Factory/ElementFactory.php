<?php

namespace App\Factory;

use App\Entity\Element;
use App\Repository\ElementRepository;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;
use Zenstruck\Foundry\Persistence\Proxy;
use Zenstruck\Foundry\Persistence\ProxyRepositoryDecorator;

/**
 * @extends PersistentProxyObjectFactory<Element>
 *
 * @method        Element|Proxy create(array|callable $attributes = [])
 * @method static Element|Proxy createOne(array $attributes = [])
 * @method static Element|Proxy find(object|array|mixed $criteria)
 * @method static Element|Proxy findOrCreate(array $attributes)
 * @method static Element|Proxy first(string $sortedField = 'id')
 * @method static Element|Proxy last(string $sortedField = 'id')
 * @method static Element|Proxy random(array $attributes = [])
 * @method static Element|Proxy randomOrCreate(array $attributes = [])
 * @method static ElementRepository|ProxyRepositoryDecorator repository()
 * @method static Element[]|Proxy[] all()
 * @method static Element[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Element[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Element[]|Proxy[] findBy(array $attributes)
 * @method static Element[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Element[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ElementFactory extends PersistentProxyObjectFactory{
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
        return Element::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'article' => ArticleFactory::new(),
            'elementComponentName' => self::faker()->text(50),
            'elementNumber' => self::faker()->randomNumber(),
            'elementText' => self::faker()->text(),
            'image' => ImageFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Element $element): void {})
        ;
    }
}
