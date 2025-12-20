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
        $firstname = strip_tags(trim($request->request->get('firstname')));
        $lastname = strip_tags(trim($request->request->get('lastname')));
        $sender = filter_var(trim($request->request->get('email')), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($request->request->get('subject')));
        $message = strip_tags(trim($request->request->get('message')));
        $file = $request->files->get('file');

        $requiredFields = ['firstname' => $firstname, 'lastname' => $lastname, 'email' => $sender, 'subject' => $subject, 'message' => $message];
        foreach ($requiredFields as $field => $value) {
            if (empty($value)) {
                return $this->json([
                    'error' => "field '$field' required.",
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        if (!filter_var($sender, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'error' => 'invalid email address',
            ], Response::HTTP_BAD_REQUEST);
        }

        $allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
        $maxFileSize = 5 * 1024 * 1024;

        if ($file) {
            if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
                return $this->json([
                    'error' => 'File type is not allowed.',
                ], Response::HTTP_BAD_REQUEST);
            }
            if ($file->getSize() > $maxFileSize) {
                return $this->json([
                    'error' => 'File size is too large.',
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $email = (new Email())
            ->from('contact@raphael-durand.fr')
            ->to('durandraphael.courriel@gmail.com')
            ->subject('C: '.$subject.' - '.$firstname.' '.$lastname)
            ->text("New message from: $firstname $lastname ($sender)\n\n$message");

        if ($file) {
            $email->attachFromPath(
                $file->getPathname(),
                $file->getClientOriginalName(),
                $file->getMimeType()
            );
        }

        try {
            $mailer->send($email);

            return $this->json([
                'message' => 'Contact request successfully sent',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Error happened while sending email, try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
