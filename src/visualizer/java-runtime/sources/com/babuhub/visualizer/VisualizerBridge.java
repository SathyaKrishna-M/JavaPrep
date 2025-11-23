package com.babuhub.visualizer;

/**
 * VisualizerBridge - Java → JavaScript bridge for CheerpJ
 * 
 * This class provides static methods that Java code can call to communicate
 * with the JavaScript visualizer frontend via CheerpJ's JS interop.
 * 
 * The instrumented code calls these methods, which then invoke JavaScript
 * functions exposed on window.__visualizerBridge
 */
public class VisualizerBridge {
    
    /**
     * Calls a JavaScript function via CheerpJ's JS interop
     */
    private static native void callJS(String functionName, Object... args);
    
    /**
     * Tracks execution step
     */
    public static void trackStep(int lineNumber, int stepIndex) {
        callJS("trackStep", lineNumber, stepIndex);
    }
    
    /**
     * Tracks variable state
     */
    public static void trackVariable(String name, String value, String type, String scope) {
        callJS("trackVariable", name, value, type, scope);
    }
    
    /**
     * Captures output (System.out.print/println)
     */
    public static void captureOutput(String text) {
        callJS("captureOutput", text);
    }
    
    /**
     * Tracks object creation
     */
    public static void trackObject(String objectId, String type, String fieldsJson) {
        callJS("trackObject", objectId, type, fieldsJson);
    }
    
    /**
     * Tracks method entry
     */
    public static void trackMethodEnter(String methodName, String className, int lineNumber) {
        callJS("trackMethodEnter", methodName, className, lineNumber);
    }
    
    /**
     * Tracks method exit
     */
    public static void trackMethodExit(String methodName, String className) {
        callJS("trackMethodExit", methodName, className);
    }
    
    /**
     * Tracks exception
     */
    public static void trackException(String exceptionType, String message, int lineNumber, String stackTraceJson) {
        callJS("trackException", exceptionType, message, lineNumber, stackTraceJson);
    }
    
    /**
     * Tracks object creation (Milestone D)
     */
    public static void trackObjectCreated(String objectId, String type, String fieldsJson) {
        callJS("trackObjectCreated", objectId, type, fieldsJson);
    }
    
    /**
     * Tracks field write (Milestone D)
     */
    public static void trackFieldWrite(String objectId, String fieldName, String valueJson) {
        callJS("trackFieldWrite", objectId, fieldName, valueJson);
    }
    
    /**
     * Tracks array creation (Milestone D)
     */
    public static void trackArrayCreate(String objectId, String componentType, int length) {
        callJS("trackArrayCreate", objectId, componentType, length);
    }
    
    /**
     * Tracks collection event (Milestone D)
     */
    public static void trackCollectionEvent(String objectId, String collectionType, String action, String previewJson) {
        callJS("trackCollectionEvent", objectId, collectionType, action, previewJson);
    }
    
    /**
     * Tracks method return (Milestone D)
     */
    public static void trackMethodReturn(String methodName, String returnValueJson) {
        callJS("trackMethodReturn", methodName, returnValueJson);
    }
    
    /**
     * Tracks try/catch entry (Milestone D)
     */
    public static void trackTryCatchEnter(String tryId, int lineNumber) {
        callJS("trackTryCatchEnter", tryId, lineNumber);
    }
    
    /**
     * Tracks finally entry (Milestone D)
     */
    public static void trackFinallyEnter(String finallyId, int lineNumber) {
        callJS("trackFinallyEnter", finallyId, lineNumber);
    }
    
    /**
     * Tracks static initialization (Milestone D)
     */
    public static void trackStaticInit(String className, String status) {
        callJS("trackStaticInit", className, status);
    }
    
    /**
     * Tracks this reference (Milestone D)
     */
    public static void trackThisReference(String methodName, String thisId) {
        callJS("trackThisReference", methodName, thisId);
    }
}

