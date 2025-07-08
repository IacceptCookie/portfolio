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
        $data = json_decode($request->getContent(), true);

        $requiredFields = ['firstname', 'lastname', 'email', 'subject-selector'];

        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return $this->json([
                    'error' => "field '$field' required."
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $firstname = strip_tags(trim($data['firstname']));
        $lastname = strip_tags(trim($data['lastname']));
        $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
        $subjectSelector = strip_tags(trim($data['subject-selector']));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'error' => 'invalid email address'
            ], Response::HTTP_BAD_REQUEST);
        }

        // TODO: Set up a template for the Contact form email (and another one for the 2FA code)
        $email = (new Email())
            ->from('contact@raphael-durand.fr')
            ->to('durandraphael.courriel@gmail.com')
            ->subject('C: '.$data['subject-selector'].' '.$firstname.' '.$lastname)
            ->text('Votre code de vérification est : . (Ce code est valable 5 minutes)');

        $mailer->send($email);

        return $this->json([
            'message' => 'Contact request successfully sent',
        ], Response::HTTP_OK);
    }
}
