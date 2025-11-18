/**
  {
    "api": 1,
    "name": "Generate SSH Key Info",
    "description": "Generate SSH key generation command",
    "author": "Boop",
    "icon": "key",
    "tags": "ssh,key,generate,security"
  }
**/

function main(state) {
  const email = state.text.trim() || 'user@example.com';

  const commands = `# Generate ED25519 SSH key (recommended)
ssh-keygen -t ed25519 -C "${email}"

# Or generate RSA 4096-bit key (legacy compatibility)
ssh-keygen -t rsa -b 4096 -C "${email}"

# View public key
cat ~/.ssh/id_ed25519.pub

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy to clipboard (Linux with xclip)
xclip -sel clip < ~/.ssh/id_ed25519.pub`;

  state.text = commands;
  state.postInfo("Generated SSH key commands");
}
