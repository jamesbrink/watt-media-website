{
  description = "Watt Media Website Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    devshell.url = "github:numtide/devshell";
    flake-utils.url = "github:numtide/flake-utils";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs = { self, nixpkgs, devshell, flake-utils, treefmt-nix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ devshell.overlays.default ];
        };

        treefmtEval = treefmt-nix.lib.evalModule pkgs {
          projectRootFile = "flake.nix";
          programs = {
            nixpkgs-fmt.enable = true;
            prettier = {
              enable = true;
              includes = [ "src/**/*.{astro,html,css,js,ts}" ];
            };
          };
        };
      in
      {
        formatter = treefmtEval.config.build.wrapper;

        checks = {
          formatting = treefmtEval.config.build.check self;
        };

        devShells.default = pkgs.devshell.mkShell {
          name = "watt-media";

          packages = with pkgs; [
            # Node.js and package managers
            nodejs_20
            yarn
            nodePackages.pnpm

            # Node.js dev tools
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.vscode-langservers-extracted
            nodePackages.eslint
            nodePackages.prettier
            
            # Astro support
            astro-language-server

            # CSS tools
            nodePackages.stylelint
            nodePackages.postcss
            nodePackages.tailwindcss

            # Formatting
            treefmtEval.config.build.wrapper

            # Common tools
            bashInteractive
            gnused
            coreutils
            findutils
            gnugrep
            gawk
            jq
            curl
            wget
            ripgrep
            fd
            git
          ];

          commands = [
            {
              name = "dev";
              category = "development";
              help = "Start Astro development server with hot reload";
              command = "npm install && npm run dev";
            }
            {
              name = "build";
              category = "development";
              help = "Build the static site for production";
              command = "npm install && npm run build";
            }
            {
              name = "preview";
              category = "development";
              help = "Preview the production build";
              command = "npm install && npm run preview";
            }
            {
              name = "format";
              category = "code quality";
              help = "Format all files (Nix, HTML, CSS, JS) with treefmt";
              command = "treefmt";
            }
            {
              name = "lint";
              category = "code quality";
              help = "Run ESLint on JavaScript/TypeScript/Astro files";
              command = "npm run lint";
            }
            {
              name = "test";
              category = "code quality";
              help = "Run tests with Vitest";
              command = "npm run test";
            }
            {
              name = "typecheck";
              category = "code quality";
              help = "Run TypeScript type checking";
              command = "npm run typecheck";
            }
            {
              name = "check";
              category = "code quality";
              help = "Check formatting and run all linters";
              command = "echo 'Checking formatting...' && treefmt --fail-on-change && echo '' && echo 'Running ESLint...' && npm run lint && echo '' && echo 'Type checking...' && npm run typecheck";
            }
            {
              name = "clean";
              category = "utility";
              help = "Clean node_modules and build artifacts";
              command = "rm -rf node_modules dist .astro";
            }
          ];

          env = [
            {
              name = "NODE_ENV";
              value = "development";
            }
          ];

          devshell.startup.npm-install = {
            deps = [ ];
            text = ''
              echo "🔧 Setting up development environment..."
              
              # Create node_modules symlink if it doesn't exist
              if [ ! -e node_modules ] && [ -f package.json ]; then
                echo "📦 Installing npm dependencies..."
                npm install
              fi
              
              echo "✅ Environment ready! Run 'dev' to start the development server."
            '';
          };

          motd = ''
            🎨 Watt Media Website Development Environment

            $(menu)
          '';
        };
      });
}
