FROM centos:7

# system update
RUN yum update && yum clean all
