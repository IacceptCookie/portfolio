<?php

namespace App\Factory;

use App\Entity\Tag;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Tag>
 */
final class TagFactory extends PersistentProxyObjectFactory
{
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Tag::class;
    }

    protected function defaults(): array|callable
    {
        return [
            'tagColor' => substr(self::faker()->hexColor(), 1),
            'tagLabel' => self::faker()->text(50),
        ];
    }

    protected function initialize(): TagFactory
    {
        return $this
        ;
    }
}
