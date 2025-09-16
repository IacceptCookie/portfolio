<?php

namespace App\Factory;

use App\Entity\Element;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Element>
 */
final class ElementFactory extends PersistentProxyObjectFactory
{
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Element::class;
    }

    protected function defaults(): array|callable
    {
        return [
            'article' => ArticleFactory::new(),
            'elementComponentName' => self::faker()->text(50),
            'elementNumber' => self::faker()->randomNumber(),
            'elementText' => self::faker()->text(),
            'elementHref' => self::faker()->text(),
            'image' => ImageFactory::new(),
        ];
    }

    protected function initialize(): ElementFactory
    {
        return $this
        ;
    }
}
