package com.babuhub.visualizer;

import org.teavm.interop.Export;
import org.teavm.interop.Import;

/**
 * Visualizer Runtime Helper Class
 * 
 * This Java class provides hooks for the visualizer to track execution.
 * It will be compiled to WASM using TeaVM and called from JavaScript.
 * 
 * Milestone D: Advanced execution tracking (exceptions, heap, collections, OOP, recursion)
 */
public class VisualizerRuntime {
    // Runtime state
    private static boolean initialized = false;
    private static int currentStep = 0;
    private static int currentLine = 0;
    private static StringBuilder output = new StringBuilder();
    private static int objectIdCounter = 0;
    
    // Callback references (will be set from JavaScript)
    private static Object snapshotCallback = null;
    private static Object errorCallback = null;
    
    /**
     * Main method required by TeaVM (entry point for compilation)
     * This method is not used at runtime - all functionality is via exported methods
     */
    public static void main(String[] args) {
        // This method is required by TeaVM but not used at runtime
        // All functionality is accessed via @Export methods called from JavaScript
        initialize();
    }
    
    /**
     * Initializes the runtime environment
     */
    @Export(name = "initialize")
    public static void initialize() {
        if (initialized) {
            return;
        }
        
        initialized = true;
        currentStep = 0;
        currentLine = 0;
        output.setLength(0);
        objectIdCounter = 0;
    }
    
    /**
     * Simple ping method to test WASM loading
     */
    @Export(name = "ping")
    public static String ping() {
        return "pong";
    }
    
    /**
     * Accepts instrumented Java code and prepares for execution
     */
    @Export(name = "acceptCode")
    public static boolean acceptCode(String instrumentedCode) {
        if (!initialized) {
            initialize();
        }
        
        reset();
        return true;
    }
    
    /**
     * Placeholder method to simulate calling "main"
     */
    @Export(name = "invokeMain")
    public static int invokeMain() {
        if (!initialized) {
            return -1;
        }
        
        return 0;
    }
    
    /**
     * Tracks a step in execution
     */
    @Export(name = "trackStep")
    public static void trackStep(int lineNumber) {
        currentLine = lineNumber;
        currentStep++;
    }
    
    /**
     * Captures output from System.out.println/print
     */
    @Export(name = "captureOutput")
    public static void captureOutput(String text) {
        if (text != null) {
            output.append(text);
        }
    }
    
    /**
     * Tracks variable assignment
     */
    @Export(name = "trackVariable")
    public static void trackVariable(String name, String value, String type) {
        // Handled via callbacks
    }
    
    /**
     * Tracks method entry
     */
    @Export(name = "trackMethodEntry")
    public static void trackMethodEntry(String className, String methodName, int lineNumber) {
        // Handled via callbacks
    }
    
    /**
     * Tracks method exit
     */
    @Export(name = "trackMethodExit")
    public static void trackMethodExit(String className, String methodName, int lineNumber) {
        // Handled via callbacks
    }
    
    /**
     * Tracks object creation (basic)
     */
    @Export(name = "trackObjectCreation")
    public static void trackObjectCreation(String objectId, String className) {
        // Handled via callbacks
    }
    
    // ========== Milestone D: Advanced Tracking Hooks ==========
    
    /**
     * Tracks object creation with field information
     * 
     * @param objectId - Unique object identifier
     * @param type - Class name
     * @param shallowFields - JSON string of field names and initial values
     */
    @Export(name = "trackObjectCreated")
    public static void trackObjectCreated(String objectId, String type, String shallowFields) {
        // TODO: Store object in heap tracker
        // TODO: Call JS callback with object info
    }
    
    /**
     * Tracks field write operation
     * 
     * @param objectId - Object identifier
     * @param fieldName - Field name
     * @param value - New value (as string)
     */
    @Export(name = "trackFieldWrite")
    public static void trackFieldWrite(String objectId, String fieldName, String value) {
        // TODO: Update object in heap tracker
        // TODO: Call JS callback
    }
    
    /**
     * Tracks array creation
     * 
     * @param objectId - Array object identifier
     * @param componentType - Component type (e.g., "int", "String")
     * @param length - Array length
     */
    @Export(name = "trackArrayCreate")
    public static void trackArrayCreate(String objectId, String componentType, int length) {
        // TODO: Store array in heap tracker
        // TODO: Call JS callback
    }
    
    /**
     * Tracks collection event (add, remove, put, get)
     * 
     * @param objectId - Collection object identifier
     * @param collectionType - Collection type (e.g., "ArrayList", "HashMap")
     * @param action - Action type ("add", "remove", "put", "get", "clear")
     * @param preview - JSON string with size and preview of elements/keys
     */
    @Export(name = "trackCollectionEvent")
    public static void trackCollectionEvent(String objectId, String collectionType, String action, String preview) {
        // TODO: Update collection preview
        // TODO: Call JS callback
    }
    
    /**
     * Tracks method return value
     * 
     * @param methodName - Method name
     * @param returnValue - Return value (as string, "null" if void)
     */
    @Export(name = "trackMethodReturn")
    public static void trackMethodReturn(String methodName, String returnValue) {
        // TODO: Store return value in current frame
        // TODO: Call JS callback
    }
    
    /**
     * Tracks exception thrown
     * 
     * @param line - Line number where exception was thrown
     * @param exceptionType - Exception class name
     * @param message - Exception message
     */
    @Export(name = "trackExceptionThrown")
    public static void trackExceptionThrown(int line, String exceptionType, String message) {
        // TODO: Mark current snapshot as exceptional
        // TODO: Call JS callback with exception info
    }
    
    /**
     * Tracks try block entry
     * 
     * @param tryId - Unique try block identifier
     * @param line - Line number of try block
     */
    @Export(name = "trackTryCatchEnter")
    public static void trackTryCatchEnter(String tryId, int line) {
        // TODO: Mark active try block
        // TODO: Call JS callback
    }
    
    /**
     * Tracks finally block entry
     * 
     * @param finallyId - Unique finally block identifier
     * @param line - Line number of finally block
     */
    @Export(name = "trackFinallyEnter")
    public static void trackFinallyEnter(String finallyId, int line) {
        // TODO: Mark active finally block
        // TODO: Call JS callback
    }
    
    /**
     * Tracks static initializer start
     * 
     * @param className - Class name
     */
    @Export(name = "trackStaticInitStart")
    public static void trackStaticInitStart(String className) {
        // TODO: Mark static initialization in progress
        // TODO: Call JS callback
    }
    
    /**
     * Tracks static initializer end
     * 
     * @param className - Class name
     */
    @Export(name = "trackStaticInitEnd")
    public static void trackStaticInitEnd(String className) {
        // TODO: Mark static initialization complete
        // TODO: Call JS callback
    }
    
    /**
     * Tracks this reference in method
     * 
     * @param methodName - Method name
     * @param thisId - Object ID of 'this'
     */
    @Export(name = "trackThisReference")
    public static void trackThisReference(String methodName, String thisId) {
        // TODO: Store this reference in current frame
        // TODO: Call JS callback
    }
    
    /**
     * Generates a unique object ID
     * 
     * @param prefix - Prefix for ID (e.g., "obj", "arr")
     * @return Unique object identifier
     */
    @Export(name = "generateObjectId")
    public static String generateObjectId(String prefix) {
        objectIdCounter++;
        return prefix + "_" + objectIdCounter + "_" + currentStep;
    }
    
    /**
     * Gets current execution state
     */
    @Export(name = "getCurrentStep")
    public static int getCurrentStep() {
        return currentStep;
    }
    
    /**
     * Gets current line number
     */
    @Export(name = "getCurrentLine")
    public static int getCurrentLine() {
        return currentLine;
    }
    
    /**
     * Gets accumulated output
     */
    @Export(name = "getOutput")
    public static String getOutput() {
        return output.toString();
    }
    
    /**
     * Resets the runtime state
     */
    @Export(name = "reset")
    public static void reset() {
        currentStep = 0;
        currentLine = 0;
        output.setLength(0);
        objectIdCounter = 0;
    }
    
    /**
     * Checks if runtime is initialized
     */
    @Export(name = "isInitialized")
    public static boolean isInitialized() {
        return initialized;
    }
    
    // ========== JS Callback Registration (via @Import) ==========
    
    /**
     * Registers JavaScript callback for object created
     */
    @Import(module = "runtime", name = "registerObjectCreatedCallback")
    public static native void registerObjectCreatedCallback(Object callback);
    
    /**
     * Registers JavaScript callback for field write
     */
    @Import(module = "runtime", name = "registerFieldWriteCallback")
    public static native void registerFieldWriteCallback(Object callback);
    
    /**
     * Registers JavaScript callback for array creation
     */
    @Import(module = "runtime", name = "registerArrayCreateCallback")
    public static native void registerArrayCreateCallback(Object callback);
    
    /**
     * Registers JavaScript callback for collection events
     */
    @Import(module = "runtime", name = "registerCollectionEventCallback")
    public static native void registerCollectionEventCallback(Object callback);
    
    /**
     * Registers JavaScript callback for method return
     */
    @Import(module = "runtime", name = "registerMethodReturnCallback")
    public static native void registerMethodReturnCallback(Object callback);
    
    /**
     * Registers JavaScript callback for exception
     */
    @Import(module = "runtime", name = "registerExceptionCallback")
    public static native void registerExceptionCallback(Object callback);
    
    /**
     * Registers JavaScript callback for try/catch entry
     */
    @Import(module = "runtime", name = "registerTryCatchEnterCallback")
    public static native void registerTryCatchEnterCallback(Object callback);
    
    /**
     * Registers JavaScript callback for finally entry
     */
    @Import(module = "runtime", name = "registerFinallyEnterCallback")
    public static native void registerFinallyEnterCallback(Object callback);
    
    /**
     * Registers JavaScript callback for static init
     */
    @Import(module = "runtime", name = "registerStaticInitCallback")
    public static native void registerStaticInitCallback(Object callback);
    
    /**
     * Registers JavaScript callback for this reference
     */
    @Import(module = "runtime", name = "registerThisReferenceCallback")
    public static native void registerThisReferenceCallback(Object callback);
}
