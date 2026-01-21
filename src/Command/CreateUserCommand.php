<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'Create a new user',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('login', InputArgument::REQUIRED, 'User login')
            ->addArgument('email', InputArgument::REQUIRED, 'User email')
            ->addArgument('password', InputArgument::REQUIRED, 'User password')
            ->addOption('firstname', null, InputOption::VALUE_OPTIONAL, 'First name', '')
            ->addOption('lastname', null, InputOption::VALUE_OPTIONAL, 'Last name', '')
            ->addOption('roles', null, InputOption::VALUE_OPTIONAL, 'Roles (comma-separated)', 'ROLE_READER');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $user = new User();
        $user->setLogin($input->getArgument('login'));
        $user->setEmail($input->getArgument('email'));
        $user->setFirstname($input->getOption('firstname'));
        $user->setLastname($input->getOption('lastname'));

        $roles = array_map('trim', explode(',', $input->getOption('roles')));
        $user->setRoles($roles);

        $hashedPassword = $this->passwordHasher->hashPassword($user, $input->getArgument('password'));
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success(sprintf('User "%s" created with roles: %s', $user->getLogin(), implode(', ', $roles)));

        return Command::SUCCESS;
    }
}
