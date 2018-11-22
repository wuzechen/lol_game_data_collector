FROM centos:7

# system update
USER root
RUN yum update && yum clean all

