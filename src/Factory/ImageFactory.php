<?php

namespace App\Factory;

use App\Entity\Image;
use App\Repository\ImageRepository;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;
use Zenstruck\Foundry\Persistence\Proxy;
use Zenstruck\Foundry\Persistence\ProxyRepositoryDecorator;

/**
 * @extends PersistentProxyObjectFactory<Image>
 *
 * @method        Image|Proxy create(array|callable $attributes = [])
 * @method static Image|Proxy createOne(array $attributes = [])
 * @method static Image|Proxy find(object|array|mixed $criteria)
 * @method static Image|Proxy findOrCreate(array $attributes)
 * @method static Image|Proxy first(string $sortedField = 'id')
 * @method static Image|Proxy last(string $sortedField = 'id')
 * @method static Image|Proxy random(array $attributes = [])
 * @method static Image|Proxy randomOrCreate(array $attributes = [])
 * @method static ImageRepository|ProxyRepositoryDecorator repository()
 * @method static Image[]|Proxy[] all()
 * @method static Image[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Image[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Image[]|Proxy[] findBy(array $attributes)
 * @method static Image[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Image[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ImageFactory extends PersistentProxyObjectFactory{
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
        return Image::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'imagePath' => self::faker()->text(255),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Image $image): void {})
        ;
    }
}
