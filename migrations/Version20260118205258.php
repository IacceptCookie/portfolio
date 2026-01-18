<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260118205258 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Make Element.image and Element.elementHref nullable to support different element types';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE element ALTER image_id DROP NOT NULL');
        $this->addSql('ALTER TABLE element ALTER element_href DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE element ALTER image_id SET NOT NULL');
        $this->addSql('ALTER TABLE element ALTER element_href SET NOT NULL');
    }
}
