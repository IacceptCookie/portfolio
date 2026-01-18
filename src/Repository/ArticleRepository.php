<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Article>
 *
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    /**
     * @return Article[]
     */
    public function findLatestPublic(int $limit = 3): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.isPublic = :isPublic')
            ->setParameter('isPublic', true)
            ->orderBy('a.creationDate', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function search(
        string $search = '',
        bool $isPublic = false,
        array $tagIds = [],
        array $categoryIds = [],
        int $limit = 10,
        int $offset = 0,
    ): array {
        $qb = $this->createQueryBuilder('a')
            ->leftJoin('a.tags', 't')
            ->leftJoin('a.categories', 'c')
            ->addSelect('t', 'c');

        if ('' !== $search) {
            $qb->andWhere('lower(a.articleTitle) like :term or lower(a.articleDescription) like :term')
                ->setParameter('term', '%'.strtolower($search).'%');
        }

        if ($tagIds) {
            $qb->andWhere('t.id in (:tagIds)')
                ->setParameter('tagIds', $tagIds);
        }

        if ($categoryIds) {
            $qb->andWhere('c.id in (:categoryIds)')
                ->setParameter('categoryIds', $categoryIds);
        }

        if ($isPublic) {
            $qb->andWhere('a.isPublic = :isPublic')
                ->setParameter('isPublic', true);
        }

        $qb->orderBy('a.articleTitle', 'asc')
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        $paginator = new Paginator($qb, true);
        $total = count($paginator);

        $articles = iterator_to_array($paginator);

        return [$articles, $total];
    }

    //    /**
    //     * @return Article[] Returns an array of Article objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Article
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
