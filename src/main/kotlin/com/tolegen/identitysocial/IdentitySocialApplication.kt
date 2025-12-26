package com.tolegen.identitysocial

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class IdentitySocialApplication

fun main(args: Array<String>) {
    runApplication<IdentitySocialApplication>(*args)
}
