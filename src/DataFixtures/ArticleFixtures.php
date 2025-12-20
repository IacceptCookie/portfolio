<?php

namespace App\DataFixtures;

use App\Factory\ArticleFactory;
use App\Factory\CategoryFactory;
use App\Factory\ImageFactory;
use App\Factory\TagFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ArticleFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $user = UserFactory::repository()->findOneBy(['login' => 'IacceptCookie']);
        $image = ImageFactory::repository()->findOneBy(['imagePath' => '/img/article/test.jpg']);
        $tag = TagFactory::repository()->findOneBy(['tagLabel' => 'PHP']);
        $category = CategoryFactory::repository()->findOneBy(['categoryLabel' => 'article']);

        for ($i = 1; $i <= 10; ++$i) {
            ArticleFactory::createOne(
                [
                    'articleTitle' => 'Article Fixture '.$i,
                    'articleDescription' => 'Description pour la fixture article '.$i,
                    'illustration' => $image,
                    'author' => $user,
                ]
            );
        }

        ArticleFactory::createOne(
            [
                'articleTitle' => 'Article Fixture 11',
                'articleDescription' => 'Description pour la fixture article 11',
                'illustration' => $image,
                'author' => $user,
                'categories' => [$category],
                'tags' => [$tag],
            ]
        );
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ImageFixtures::class,
            TagFixtures::class,
            CategoryFixtures::class,
        ];
    }
}
