<?php

namespace App\Factory;

use App\Entity\Image;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Image>
 */
final class ImageFactory extends PersistentProxyObjectFactory
{
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Image::class;
    }

    protected function defaults(): array|callable
    {
        return [
            'imagePath' => self::faker()->text(255),
        ];
    }

    protected function initialize(): ImageFactory
    {
        return $this
        ;
    }
}
