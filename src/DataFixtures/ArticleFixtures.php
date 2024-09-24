<?php

namespace App\DataFixtures;

use App\Factory\ArticleFactory;
use App\Factory\ImageFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ArticleFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $user = UserFactory::repository()->findOneBy(['login' => 'IacceptCookie']);
        $image = ImageFactory::repository()->findOneBy(['imagePath' => '/img/test.jpg']);

        ArticleFactory::createMany(10, ['illustration' => $image, 'author' => $user]);
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ImageFixtures::class,
        ];
    }
}
