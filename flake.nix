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
              includes = [ 
                "src/**/*.{html,css,js,ts,jsx,tsx,json,md}" 
                "*.{js,ts,json,md}"
                "e2e/**/*.{js,ts}"
              ];
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
              help = "Start Astro development server with hot reload on http://localhost:8080";
              command = ''
                echo "🚀 Starting Astro development server..."
                echo "📦 Checking dependencies..."
                npm install
                echo ""
                echo "🌐 Server will be available at: http://localhost:8080"
                echo "🔄 Hot reload is enabled"
                echo ""
                npm run dev
              '';
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
              help = "Run unit tests with Vitest (watch mode)";
              command = "npm run test";
            }
            {
              name = "test:run";
              category = "code quality";
              help = "Run unit tests once (CI mode)";
              command = "npm run test -- --run";
            }
            {
              name = "test:e2e";
              category = "code quality";
              help = "Run Playwright E2E tests";
              command = ''
                echo "🎭 Running Playwright E2E tests..."
                npx playwright install --with-deps chromium firefox webkit
                npm run test:e2e
              '';
            }
            {
              name = "test:e2e:ui";
              category = "code quality";
              help = "Open Playwright test UI";
              command = "npm run test:e2e:ui";
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
              help = "Check formatting, run all linters and tests";
              command = ''
                echo "🔍 Running all checks..."
                echo ""
                echo "📋 Checking formatting..."
                treefmt --fail-on-change
                echo "✅ Formatting check passed"
                echo ""
                echo "🔍 Running ESLint..."
                npm run lint
                echo "✅ Linting passed"
                echo ""
                echo "🔍 Type checking..."
                npm run typecheck
                echo "✅ Type checking passed"
                echo ""
                echo "🧪 Running unit tests..."
                npm run test -- --run
                echo "✅ Unit tests passed"
                echo ""
                echo "✅ All checks passed!"
              '';
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
              echo "🔧 Setting up Watt Media development environment..."
              echo ""
              
              # Create node_modules symlink if it doesn't exist
              if [ ! -e node_modules ] && [ -f package.json ]; then
                echo "📦 Installing npm dependencies..."
                npm install
                echo ""
              fi
              
              echo "✅ Environment ready!"
              echo ""
              echo "Available commands:"
              echo "  • dev      - Start development server at http://localhost:8080"
              echo "  • build    - Build for production"
              echo "  • test     - Run unit tests (watch mode)"
              echo "  • test:e2e - Run E2E tests with Playwright"
              echo "  • check    - Run all code quality checks"
              echo ""
              echo "Run 'menu' to see all available commands."
            '';
          };

          motd = ''
            🎨 Watt Media Website Development Environment

            $(menu)
          '';
        };
      });
}
