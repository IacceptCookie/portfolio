init: ## init full stack and load data
	@docker compose down
	@docker compose up -d
	@$(MAKE) composer-install


composer-install: ##
	@docker compose exec backend composer install --no-interaction