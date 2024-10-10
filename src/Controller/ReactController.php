<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'react', requirements: ['reactRouting' => '.+'])]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
