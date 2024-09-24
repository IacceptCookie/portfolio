<?php

namespace App\DataFixtures;

use App\Factory\ImageFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ImageFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ImageFactory::createOne(['imagePath' => '/img/test.jpg']);
    }
}
