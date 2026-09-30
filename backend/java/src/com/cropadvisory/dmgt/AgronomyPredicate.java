package com.cropadvisory.dmgt;

import com.cropadvisory.model.FieldZone;

/**
 * Functional interface for DMGT Predicate Logic proposition evaluation:
 * P: FieldZone -> Boolean
 */
@FunctionalInterface
public interface AgronomyPredicate {
    boolean test(FieldZone zone);

    default AgronomyPredicate and(AgronomyPredicate other) {
        return zone -> this.test(zone) && other.test(zone);
    }

    default AgronomyPredicate or(AgronomyPredicate other) {
        return zone -> this.test(zone) || other.test(zone);
    }

    default AgronomyPredicate negate() {
        return zone -> !this.test(zone);
    }
}
