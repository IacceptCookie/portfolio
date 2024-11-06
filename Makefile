init: ## init full stack and load data
	@docker compose down
	@docker compose build