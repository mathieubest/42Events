FROM oven/bun:latest

WORKDIR /home/bun/app

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    wget \
    curl \
    git \
    fish

# Remove welcome message Fish
RUN fish -c "set -U fish_greeting"

CMD ["/bin/fish"]