# 42Events
Get notified with events of your interest.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) runtime
- 42 API credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mathieubest/42Events.git
   cd 42Events
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.sample .env
   ```
   
4. Edit the `.env` file with your 42 API credentials:
   ```
   CLIENT_ID="your_client_id"
   CLIENT_SECRET="your_client_secret"
   ```

### Usage

Run the application to fetch and display events:
```bash
bun run index.ts
```

By default, the application fetches events from the Paris campus.

## Development

This project uses a development container for a consistent development environment:

1. Open the project in VSCode
2. Ensure the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension is installed
3. Click on the green icon in the bottom-left corner of VSCode and select "Reopen in Container"

## License
This project is licensed under the terms of the GNU AGPL license.

See the [GNU AGPL](LICENSE) file for detail.
