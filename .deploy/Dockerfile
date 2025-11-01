# ******************************************************************************
# *** BASE STAGE
# ******************************************************************************
# use the official Bun image, see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.3.1-alpine AS base

WORKDIR /src

# ******************************************************************************
# *** INSTALL STAGE
# ******************************************************************************
FROM base AS install

COPY package.json bun.lock ./

# 2025.08.18:
# The below line is necessary due to the PDF workspace listed in package.json
# Use bun install --filter ... to install only the necessary dependencies
# Something like --filter="!@shared/utilities/pdf/contract-and-invoice"
COPY ./libs ./libs

RUN bun install --frozen-lockfile

# ******************************************************************************
# *** BUILD STAGE
# ******************************************************************************
# Copy node_modules from temp directory then copy all (non-ignored) project files into the image
FROM base AS build

COPY --from=install ./src/node_modules node_modules
COPY . .

WORKDIR /src/apps/frontend
RUN bunx --bun astro build

# ******************************************************************************
# *** DEPLOY STAGE
# ******************************************************************************
# Copy production dependencies and source code into final image
FROM base AS deploy

# Host is necessary for Docker to bind correctly
# ENV HOST=0.0.0.0
# ENV PORT=6122

COPY --from=build ./src/dist ./dist
COPY serve.ts ./

# Run the app as bun_user
RUN addgroup -S app_group && adduser -S bun_user -G app_group
USER bun_user
EXPOSE 6122/tcp

ENTRYPOINT [ "bun", "run", "./serve.ts" ]
