nvm use --delete-prefix v22.17.0 --silent
mkdir -p /workspaces/dnalangmain/.vscode
touch /workspaces/dnalangmain/.vscode/.bash_history
chmod +x /workspaces/dnalangmain/scripts/dna-genesis-*.sh
chmod +x /workspaces/dnalangmain/scripts/dna-genesis*.sh
./scripts/dna-genesis.sh  # Interactive master protocol
echo "I'm not quite sure how to do that."
chmod +x /workspaces/dnalangmain/scripts/dna-genesis-master-deploy.sh
sed -i.bak -E '/^(prefix|globalconfig)=/d' ~/.npmrc && export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"; nvm install --lts && nvm alias default 'lts/*' && nvm use --delete-prefix 'lts/*' --silent && cd /workspaces/dnalangmain && [ -f package.json ] || npm init -y && rm -rf node_modules package-lock.json && npm i next react react-dom && mkdir -p .vscode && : > .vscode/.bash_history && bash scripts/dna-genesis-diagnostic.sh
./scripts/dna-genesis-master-deploy.sh --help
ls -la scripts/
ls -la organisms/
