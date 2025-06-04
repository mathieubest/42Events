push:
	@set -e; \
	git add .; \
	if [ -z "$(MSG)" ]; then \
		read -p "Enter commit message: " MSG; \
		if [ -z "$$MSG" ]; then \
			echo "No commit message provided. Exiting."; \
			exit 1; \
		fi; \
	fi; \
	git commit -m "$$MSG"; \
	git push

.PHONY: push
