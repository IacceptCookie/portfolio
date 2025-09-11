<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

final class ImageUploadController
{
    private array $allowedMimeTypes = [
        'image/png' => 'png',
        'image/jpeg' => 'jpg',
        'image/webp' => 'webp',
    ];

    public function __invoke(Request $request, EntityManagerInterface $em): Response
    {
        /** @var UploadedFile $uploadedFile */
        $uploadedFile = $request->files->get('file');

        if (!$uploadedFile) {
            return new JsonResponse(['error' => 'Missing file to upload'], Response::HTTP_BAD_REQUEST);
        }

        // Vérification du mime-type avec Fileinfo
        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($uploadedFile->getPathname());

        if (!isset($this->allowedMimeTypes[$mimeType])) {
            return new JsonResponse(['error' => 'File type not supported'], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        // Répertoire d’upload
        $uploadDir = __DIR__.'/../../public/img/article/uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Nom final en .webp
        $filename = uniqid('', true).'.webp';
        $filePath = $uploadDir.'/'.$filename;

        // Conversion en WebP
        switch ($mimeType) {
            case 'image/png':
                $img = imagecreatefrompng($uploadedFile->getPathname());
                break;
            case 'image/jpeg':
                $img = imagecreatefromjpeg($uploadedFile->getPathname());
                break;
            case 'image/webp':
                $img = imagecreatefromwebp($uploadedFile->getPathname());
                break;
            default:
                return new JsonResponse(['error' => 'File type not supported'], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        if (!$img) {
            return new JsonResponse(['error' => 'Error while reading the file'], Response::HTTP_BAD_REQUEST);
        }

        // Enregistrer en WebP (qualité 80)
        imagewebp($img, $filePath, 80);
        imagedestroy($img);

        return new JsonResponse([
            'path' => '/img/article/uploads/'.$filename,
        ], Response::HTTP_CREATED);
    }
}
