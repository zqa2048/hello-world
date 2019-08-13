# From image
#FROM skyrkt/nginx-node:latest
FROM nginx:latest

# Add Env
# ARG ENV_DIST
# ENV ENV_DIST ${ENV_DIST}

ARG ENV_CONF
ENV ENV_CONF ${ENV_CONF}

# Set source code
WORKDIR /var/www/html/
COPY dist/ /var/www/html/

# Copy nginx config
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/${ENV_CONF}.conf /etc/nginx/sites-enabled/app.conf

# Clean up
RUN rm -f /var/www/html/color.less

# Stat
RUN ls -l

# Start engine
CMD nginx -g "daemon off;"
