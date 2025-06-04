FROM oven/bun:latest

WORKDIR /home/bun/app

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    wget \
    curl \
    git \
    fish \
    openssh-server 

# Remove welcome message Fish
RUN fish -c "set -U fish_greeting"

# Setup openssh-server
RUN mkdir /var/run/sshd && \
    echo "root:password" | chpasswd && \
    echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]