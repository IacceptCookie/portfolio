<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

final class EmailController extends AbstractController
{
    #[Route('/email/contact', name: 'app_contact_email', methods: ['POST'])]
    public function contact(Request $request, MailerInterface $mailer): Response
    {
        // TODO: Validate data before sending the email
        $data = json_decode($request->getContent(), true);

        // TODO: Set up a template for the Contact form email (and another one for the 2FA code)
        $email = (new Email())
            ->from('contact@raphael-durand.fr')
            ->to('durandraphael.courriel@gmail.com')
            ->subject('Contact: '.$data['subject'].'')
            ->text('Votre code de vérification est : . (Ce code est valable 5 minutes)');

        $mailer->send($email);

        return $this->json([
            'message' => 'Contact request successfully sent',
        ], Response::HTTP_OK);
    }
}
