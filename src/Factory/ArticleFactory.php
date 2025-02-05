<?php

namespace App\Factory;

use App\Entity\Article;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Article>
 */
final class ArticleFactory extends PersistentProxyObjectFactory
{
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Article::class;
    }

    protected function defaults(): array|callable
    {
        return [
            'articleTitle' => self::faker()->text(80),
            'articleDescription' => self::faker()->text(400),
            'author' => UserFactory::new(),
            'illustration' => ImageFactory::new(),
            'readingTime' => self::faker()->randomNumber(),
        ];
    }

    protected function initialize(): ArticleFactory
    {
        return $this
        ;
    }
}
