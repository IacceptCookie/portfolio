<?php

namespace App\DataFixtures;

use App\Factory\ArticleFactory;
use App\Factory\ElementFactory;
use App\Factory\ImageFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ElementFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $articles = ArticleFactory::repository()->findAll();
        $image = ImageFactory::repository()->findOneBy(['imagePath' => 'test.jpg']);

        foreach ($articles as $article) {
            for ($i = 1; $i <= 3; ++$i) {
                ElementFactory::createOne(
                    [
                        'image' => $image,
                        'article' => $article,
                        'elementNumber' => $i,
                        'elementComponentName' => 'paragraph',
                        'elementText' => 'Contenu de fixture pour mon paragraphe '.$i,
                    ]
                );
            }
        }
    }

    public function getDependencies(): array
    {
        return [
            ImageFixtures::class,
            ArticleFixtures::class,
        ];
    }
}
