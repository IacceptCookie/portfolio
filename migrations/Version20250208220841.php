<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250208220841 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ADD is2fa_enabled BOOLEAN NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD email_auth_code VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD email_auth_code_expires_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP is2fa_enabled');
        $this->addSql('ALTER TABLE "user" DROP email_auth_code');
        $this->addSql('ALTER TABLE "user" DROP email_auth_code_expires_at');
    }
}
